from flask import Flask, request, jsonify
from passlib.hash import argon2
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired
from flask_cors import CORS
from wtforms.fields import StringField
import pyodbc

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mi_secreto_super_seguro'
CORS(app)
# Configuración de la base de datos
db_config = {
    'Server': 'DESKTOP-GAMNA9H',
    'Database': 'Proyectos_7',
    'UID': 'sa',
    'PWD': 'admin1',
    'Port': '1433',
    'Driver': '{ODBC Driver 17 for SQL Server}'
}

# Conexión a la base de datos
conn = pyodbc.connect(**db_config)
cursor = conn.cursor()

class CrearUsuarioForm(FlaskForm):
    # Tu clase CrearUsuarioForm sigue igual
    id = StringField('ID', validators=[InputRequired()])
    cedula = StringField('Cedula', validators=[InputRequired()])
    nombre = StringField('Nombre', validators=[InputRequired()])
    apellido = StringField('Apellido', validators=[InputRequired()])
    rol = StringField('Rol', validators=[InputRequired()])
    contrasenia = PasswordField('Contraseña', validators=[InputRequired()])
    usuario = StringField('Usuario', validators=[InputRequired()])
    telefono = StringField('Telefono', validators=[InputRequired()])
    direccion = StringField('Direccion', validators=[InputRequired()])
    correo = StringField('Correo', validators=[InputRequired()])
ADMIN_SECRET_KEY = "secreto_admin"
from flask import jsonify

@app.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    try:
        cursor.execute("SELECT id, cedula, nombre, apellido, rol, contrasenia, usuario, telefono, direccion, correo FROM usuarios")
        usuarios = cursor.fetchall()

        usuarios_json = []
        for usuario in usuarios:
            usuario_dict = {
                'id': usuario[0],
                'cedula': usuario[1],
                'nombre': usuario[2],
                'apellido': usuario[3],
                'rol': usuario[4],
                'contrasenia': usuario[5],
                'usuario': usuario[6],
                'telefono': usuario[7],
                'direccion': usuario[8],
                'correo': usuario[9]  # Agregamos el campo de correo a la respuesta
            }
            usuarios_json.append(usuario_dict)

        return jsonify({'usuarios': usuarios_json}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


from flask import jsonify

@app.route('/usuarios/<id>', methods=['GET'])
def obtener_usuario_por_id(id):
    try:
        cursor.execute("SELECT id, cedula, nombre, apellido, rol, contrasenia, usuario, telefono, direccion, correo FROM usuarios WHERE id=?", (id,))
        usuario = cursor.fetchone()

        if usuario:
            usuario_dict = {
                'id': usuario[0],
                'cedula': usuario[1],
                'nombre': usuario[2],
                'apellido': usuario[3],
                'rol': usuario[4],
                'contrasenia': usuario[5],
                'usuario': usuario[6],
                'telefono': usuario[7],
                'direccion': usuario[8],
                'correo': usuario[9]
            }

            return jsonify({'usuario': usuario_dict}), 200
        else:
            return jsonify({'mensaje': 'Usuario no encontrado'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ...

@app.route('/usuarios/<id>', methods=['DELETE'])
def eliminar_usuario(id):
    try:
        admin_token = request.headers.get('Admin-Token')

        if admin_token == ADMIN_SECRET_KEY:
            cursor.execute("DELETE FROM usuarios WHERE id=?", (id,))
            conn.commit()

            return jsonify({'mensaje': 'Usuario eliminado correctamente'}), 200
        else:
            return jsonify({'error': 'Acceso no autorizado'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ...

from flask import request, jsonify
from argon2 import PasswordHasher


@app.route('/usuarios', methods=['POST'])
def crear_usuario():
    try:
        data = request.get_json()

        id = data.get('id')
        cedula = data.get('cedula')
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        rol = data.get('rol')
        contrasenia = data.get('contrasenia')
        usuario = data.get('usuario')
        telefono = data.get('telefono')
        direccion = data.get('direccion')
        correo = data.get('correo')

        # Verificar si ya existe un usuario con el mismo ID
        cursor.execute("SELECT * FROM usuarios WHERE id = ?", (id,))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({'error': f'El usuario ya existe con el ID {id}.'}), 400

        contrasenia_cifrada = argon2.hash(contrasenia)

        # Si no hay un usuario con el mismo ID, proceder con la inserción
        cursor.execute("INSERT INTO usuarios (id, cedula, nombre, apellido, rol, contrasenia, usuario, telefono, direccion, correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                       (id, cedula, nombre, apellido, rol, contrasenia_cifrada, usuario, telefono, direccion, correo))
        conn.commit()

        return jsonify({'mensaje': 'Usuario creado correctamente.'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/usuarios/<id>', methods=['PUT'])
def actualizar_usuario(id):
    try:
        admin_token = request.headers.get('Admin-Token')

        if admin_token == ADMIN_SECRET_KEY:
            data = request.get_json()

            usuario = data.get('usuario')
            contrasenia = data.get('contrasenia')
            
            nombre = data.get('nombre')
            apellido = data.get('apellido')
            rol = data.get('rol')
            telefono = data.get('telefono')
            direccion = data.get('direccion')

            if contrasenia:
                contrasenia_cifrada = argon2.hash(contrasenia)
                cursor.execute("UPDATE usuarios SET usuario=?, contrasenia=?, nombre=?, apellido=?, rol=?, telefono=?, direccion=? WHERE id=?",
                               (usuario, contrasenia_cifrada, nombre, apellido, rol, telefono, direccion, id))
            else:
                cursor.execute("UPDATE usuarios SET usuario=?, nombre=?, apellido=?, rol=?, telefono=?, direccion=? WHERE id=?",
                               (usuario, nombre, apellido, rol, telefono, direccion, id))

            conn.commit()

            return jsonify({'mensaje': 'Usuario actualizado correctamente'}), 200
        else:
            return jsonify({'error': 'Acceso no autorizado'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500
from flask import jsonify

@app.route('/usuarios/verificar', methods=['POST'])
def verificar_usuario():
    try:
        data = request.get_json()
        id = data['id']
        contrasenia_ingresada = data['contrasenia']

        cursor.execute("SELECT id, nombre, apellido, contrasenia, rol FROM usuarios WHERE id=?", (id,))
        usuario_info = cursor.fetchone()

        if usuario_info:
            id_usuario = usuario_info[0]
            nombre_usuario = usuario_info[1]
            apellido_usuario = usuario_info[2]
            contrasenia_cifrada_almacenada = usuario_info[3]
            rol_usuario = usuario_info[4]

            if argon2.verify(contrasenia_ingresada, contrasenia_cifrada_almacenada):
                return jsonify({
                    'mensaje': 'Contraseña correcta',
                    'id': id_usuario,
                    'nombre': nombre_usuario,
                    'apellido': apellido_usuario,
                    'rol': rol_usuario
                }), 200
            else:
                return jsonify({'mensaje': 'Contraseña incorrecta'}), 401
        else:
            return jsonify({'mensaje': 'Usuario no encontrado'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Resto del código sigue igual...

if __name__ == '__main__':
    app.run(debug=True)
