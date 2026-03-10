import React, { useEffect, useMemo, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { getStoredContacts, saveNewContact } from "./services/agendaService";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [savingContact, setSavingContact] = useState(false);
  const [systemMessage, setSystemMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const orderedContacts = useMemo(() => {
    return [...contacts].sort((first, second) => {
      const firstName = `${first.nombre} ${first.apellido}`.toLowerCase();
      const secondName = `${second.nombre} ${second.apellido}`.toLowerCase();
      return firstName.localeCompare(secondName);
    });
  }, [contacts]);

  const showMessage = (text, type = "success") => {
    setSystemMessage(text);
    setMessageType(type);
  };

  const loadAgenda = async () => {
    try {
      setLoadingContacts(true);
      const receivedContacts = await getStoredContacts();
      setContacts(receivedContacts);
    } catch (error) {
      showMessage(
        error.message || "Se produjo un error al cargar los contactos.",
        "error"
      );
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    loadAgenda();
  }, []);

  const registerContact = async (contactData) => {
    try {
      setSavingContact(true);
      showMessage("");

      await saveNewContact(contactData);
      await loadAgenda();

      showMessage("El contacto se registró correctamente.", "success");
    } catch (error) {
      showMessage(
        error.message || "No se pudo completar el registro del contacto.",
        "error"
      );
      throw error;
    } finally {
      setSavingContact(false);
    }
  };

  return (
    <main className="app-frame">
      <section className="hero-banner">
        <p className="hero-tag">Tarea 4 · React</p>
        <p className="hero-copy">
          
        </p>
      </section>

      {systemMessage && (
        <div
          className={`status-box ${
            messageType === "error" ? "status-error" : "status-success"
          }`}
        >
          {systemMessage}
        </div>
      )}

      <section className="workspace">
        <ContactForm
       onCreateContact={registerContact}
        isSubmitting={savingContact}
       onReloadContacts={loadAgenda}
      totalContacts={orderedContacts.length}
        />

        <ContactList contacts={orderedContacts} isLoading={loadingContacts} />
      </section>
    </main>
  );
}

export default App;