const AGENDA_ENDPOINT = "https://www.raydelto.org/agenda.php";

function validateContactPayload(contact) {
  if (!contact || typeof contact !== "object") {
    throw new Error("Los datos del contacto no son válidos.");
  }

  const requiredFields = ["nombre", "apellido", "telefono"];

  for (const field of requiredFields) {
    if (!contact[field] || !String(contact[field]).trim()) {
      throw new Error(`El campo "${field}" es obligatorio.`);
    }
  }
}

export async function getStoredContacts() {
  const response = await fetch(AGENDA_ENDPOINT);

  if (!response.ok) {
    throw new Error("No fue posible consultar los contactos.");
  }

  const contacts = await response.json();

  if (!Array.isArray(contacts)) {
    throw new Error("La respuesta del servidor no tiene el formato esperado.");
  }

  return contacts;
}

export async function saveNewContact(contactData) {
  validateContactPayload(contactData);

  const response = await fetch(AGENDA_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    throw new Error("No fue posible guardar el nuevo contacto.");
  }

  return await response.text();
}