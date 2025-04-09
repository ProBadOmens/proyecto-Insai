export const validateField = (value, regex, errorMessage) => {
    if (!value.trim()) {
        return { valid: false, message: 'Complete Todos los Campos' };
    }
    if (!regex.test(value)) {
        return { valid: false, message: errorMessage };
    }
    return { valid: true, message: '' };
};

export const validationRules = {
    cedula: {
        regex: /^[V|E]-\d{7,8}$/, // Ejemplo: V-12345678
        errorMessage: 'La cédula debe tener el formato V-12345678 o E-12345678'
    },
    nombre: {
        regex: /^[a-zA-Z\s]+$/, // Solo letras y espacios
        errorMessage: 'El nombre solo puede contener letras y espacios'
    },
    apellido: {
        regex: /^[a-zA-Z\s]+$/, // Solo letras y espacios
        errorMessage: 'El apellido solo puede contener letras y espacios'
    },
    contacto: {
        regex: /^04\d{2}-\d{7}$/, // Ejemplo: 0412-1234567
        errorMessage: 'El contacto debe tener el formato 04XX-XXXXXXX'
    },
    profesion: {
        regex: /^[a-zA-Z\s]+$/, // Solo letras y espacios
        errorMessage: 'La profesión solo puede contener letras y espacios'
    },
    cargo: {
        regex: /^[a-zA-Z\s]+$/, // Solo letras y espacios
        errorMessage: 'El cargo solo puede contener letras y espacios'
    }
};