from flask import Flask, request, jsonify
import mysql.connector
from passlib.hash import argon2
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length, Regexp

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mi_secreto_super_seguro'

# Configuración de la base de datos
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'seguro'
}

# Conexión a la base de datos
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

class CrearUsuarioForm(FlaskForm):
    id = StringField('ID', validators=[InputRequired()])
    cedula = StringField('Cedula', validators=[InputRequired()])
    nombre = StringField('Nombre', validators=[InputRequired()])
    apellido = StringField('Apellido', validators=[InputRequired()])
    rol = StringField('Rol', validators=[InputRequired()])
    contrasenia = PasswordField('Contraseña', validators=[InputRequired()])
    usuario = StringField('Usuario', validators=[InputRequired()])
    telefono = StringField('Telefono', validators=[InputRequired()])
    direccion = StringField('Direccion', validators=[InputRequired()])

@app.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    try:
        cursor.execute("SELECT id, cedula, nombre, apellido, rol, contrasenia, usuario, telefono, direccion FROM usuarios")
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
                'direccion': usuario[8]
            }
            usuarios_json.append(usuario_dict)

        return jsonify({'usuarios': usuarios_json}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

ADMIN_SECRET_KEY = "secreto_admin"

@app.route('/usuarios/<id>', methods=['DELETE'])
def eliminar_usuario(id):
    try:
        admin_token = request.headers.get('Admin-Token')

        if admin_token == ADMIN_SECRET_KEY:
            cursor.execute("DELETE FROM usuarios WHERE id=%s", (id,))
            conn.commit()

            return jsonify({'mensaje': 'Usuario eliminado correctamente'}), 200
        else:
            return jsonify({'error': 'Acceso no autorizado'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500

class ActualizarUsuarioForm(FlaskForm):
    usuario = StringField('Usuario', validators=[InputRequired()])
    contrasenia = PasswordField('Contraseña', validators=[
        InputRequired()])
    correo = StringField('Correo', validators=[InputRequired()])
    nombre = StringField('Nombre', validators=[InputRequired()])
    apellido = StringField('Apellido', validators=[InputRequired()])
    rol = StringField('Rol', validators=[InputRequired()])
    telefono = StringField('Telefono', validators=[InputRequired()])
    direccion = StringField('Direccion', validators=[InputRequired()])

@app.route('/usuarios', methods=['POST'])
def crear_usuario():
    try:
        data = request.get_json()

        # Procesa los datos manualmente en lugar de usar Flask-WTF
        id = data.get('id')
        cedula = data.get('cedula')
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        rol = data.get('rol')
        contrasenia = data.get('contrasenia')
        usuario = data.get('usuario')
        telefono = data.get('telefono')
        direccion = data.get('direccion')

        contrasenia_cifrada = argon2.hash(contrasenia)

        cursor.execute("INSERT INTO usuarios (id, cedula, nombre, apellido, rol, contrasenia, usuario, telefono, direccion) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                       (id, cedula, nombre, apellido, rol, contrasenia_cifrada, usuario, telefono, direccion))
        conn.commit()

        return jsonify({'mensaje': 'Usuario creado correctamente'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/usuarios/<id>', methods=['PUT'])
def actualizar_usuario(id):
    try:
        admin_token = request.headers.get('Admin-Token')

        if admin_token == ADMIN_SECRET_KEY:
            data = request.get_json()

            # Obtén los datos del formulario directamente
            usuario = data.get('usuario')
            contrasenia = data.get('contrasenia')
            correo = data.get('correo')
            nombre = data.get('nombre')
            apellido = data.get('apellido')
            rol = data.get('rol')
            telefono = data.get('telefono')
            direccion = data.get('direccion')

            # Verifica si se proporcionó una nueva contraseña
            if contrasenia:
                contrasenia_cifrada = argon2.hash(contrasenia)
                cursor.execute("UPDATE usuarios SET usuario=%s, contrasenia=%s, correo=%s, nombre=%s, apellido=%s, rol=%s, telefono=%s, direccion=%s WHERE id=%s",
                               (usuario, contrasenia_cifrada, correo, nombre, apellido, rol, telefono, direccion, id))
            else:
                # Si no se proporciona una nueva contraseña, actualiza los demás campos sin cambiar la contraseña
                cursor.execute("UPDATE usuarios SET usuario=%s, correo=%s, nombre=%s, apellido=%s, rol=%s, telefono=%s, direccion=%s WHERE id=%s",
                               (usuario, correo, nombre, apellido, rol, telefono, direccion, id))

            conn.commit()

            return jsonify({'mensaje': 'Usuario actualizado correctamente'}), 200
        else:
            return jsonify({'error': 'Acceso no autorizado'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/usuarios/verificar', methods=['POST'])
def verificar_usuario():
    try:
        data = request.get_json()
        id = data['id']
        contrasenia_ingresada = data['contrasenia']

        cursor.execute("SELECT usuario, contrasenia FROM usuarios WHERE id=%s", (id,))
        usuario_info = cursor.fetchone()

        if usuario_info:
            usuario_cifrado_almacenado = usuario_info[0]
            contrasenia_cifrada_almacenada = usuario_info[1]

            if argon2.verify(contrasenia_ingresada, contrasenia_cifrada_almacenada):
                return jsonify({'mensaje': 'Contraseña correcta'}), 200
            else:
                return jsonify({'mensaje': 'Contraseña incorrecta'}), 401
        else:
            return jsonify({'mensaje': 'Usuario no encontrado'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

SECRET_KEY = "mi_secreto_super_seguro"

if __name__ == '__main__':
    app.run(debug=True)
