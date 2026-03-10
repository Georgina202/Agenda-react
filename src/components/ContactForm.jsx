import React, { useState } from "react";

const EMPTY_FORM = {
  nombre: "",
  apellido: "",
  telefono: "",
};

function ContactForm({ onCreateContact, isSubmitting, onReloadContacts, totalContacts }) {
  const [formValues, setFormValues] = useState(EMPTY_FORM);
  const [validationMessage, setValidationMessage] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (validationMessage) {
      setValidationMessage("");
    }
  };

  const normalizePhone = (phone) => {
    return phone.replace(/\s+/g, "").trim();
  };

  const buildContactPayload = () => {
    const nombre = formValues.nombre.trim();
    const apellido = formValues.apellido.trim();
    const telefono = normalizePhone(formValues.telefono);

    if (!nombre || !apellido || !telefono) {
      throw new Error("Debes completar nombre, apellido y teléfono.");
    }

    if (telefono.length < 7) {
      throw new Error("El teléfono ingresado parece incompleto.");
    }

    return { nombre, apellido, telefono };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const contactPayload = buildContactPayload();
      await onCreateContact(contactPayload);
      setFormValues(EMPTY_FORM);
      setValidationMessage("");
    } catch (error) {
      setValidationMessage(error.message || "No fue posible validar el formulario.");
    }
  };

  return (
    <section className="panel form-panel">
      <div className="section-heading">
        <h2>Agregar contacto</h2>
      </div>

      <form className="agenda-form" onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ej: Georgina"
            value={formValues.nombre}
            onChange={updateField}
          />
        </div>

        <div className="input-block">
          <label htmlFor="apellido">Apellido</label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            placeholder="Ej: Rivas"
            value={formValues.apellido}
            onChange={updateField}
          />
        </div>

        <div className="input-block">
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            name="telefono"
            type="text"
            placeholder="Ej: 8299646486"
            value={formValues.telefono}
            onChange={updateField}
          />
        </div>

        {validationMessage && (
          <p className="inline-message error-text">{validationMessage}</p>
        )}

        <div className="form-actions">
          <button className="primary-action" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
          </button>

          <button
            className="secondary-action"
            type="button"
            onClick={onReloadContacts}
            disabled={isSubmitting}
          >
            Recargar
          </button>
        </div>
      </form>

      <div className="form-footer">
        Listo. Contactos cargados: {totalContacts}
      </div>
    </section>
  );
}

export default ContactForm;