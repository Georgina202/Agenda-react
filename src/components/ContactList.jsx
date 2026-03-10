import React from "react";

function ContactList({ contacts, isLoading }) {
  const totalContacts = contacts.length;

  return (
    <section className="panel list-panel">
      <div className="list-topbar">
        <div className="section-heading">
          <h2>Contactos</h2>
        </div>

        <div className="contact-total">{totalContacts}</div>
      </div>

      {isLoading ? (
        <p className="inline-message">Cargando contactos...</p>
      ) : totalContacts === 0 ? (
        <p className="inline-message">Todavía no hay contactos para mostrar.</p>
      ) : (
        <div className="contact-collection">
          <table className="contact-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={`${contact.nombre}-${contact.apellido}-${contact.telefono}-${index}`}>
                  <td>{contact.nombre || "No disponible"}</td>
                  <td>{contact.apellido || "No disponible"}</td>
                  <td>{contact.telefono || "No disponible"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ContactList;