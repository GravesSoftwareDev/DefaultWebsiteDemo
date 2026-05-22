import { useState, useEffect } from 'react'
import { fetchContacts, updateContact } from '../../../jsTools/API'

export default function ContactList() {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [expandedId, setExpandedId] = useState(null)

    useEffect(() => {
        fetchContacts()
            .then(data => setContacts(data))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [])

    const toggleRead = async (contact) => {
        try {
            const updated = await updateContact(contact.id, { read: !contact.read })
            setContacts(prev => prev.map(c => c.id === contact.id ? updated : c))
        } catch (e) {
            window.alert('Could not update: ' + e.message)
        }
    }

    const unread = contacts.filter(c => !c.read).length

    return (
        <>
            <div className="list-toolbar">
                <div className="list-stats">
                    <span className="stat-chip">{contacts.length} total</span>
                    {unread > 0 && <span className="stat-chip unread">{unread} unread</span>}
                </div>
            </div>

            {loading && <div className="list-state">Loading submissions…</div>}
            {error && <div className="list-state error">{error}</div>}

            {!loading && !error && contacts.length === 0 && (
                <div className="list-empty">
                    <p>No contact submissions yet.</p>
                </div>
            )}

            {!loading && contacts.length > 0 && (
                <div className="contact-list">
                    {contacts.map(contact => {
                        const isExpanded = expandedId === contact.id
                        const name = [contact.first_name, contact.last_name].filter(Boolean).join(' ')
                        return (
                            <div key={contact.id} className={`contact-card ${!contact.read ? 'unread' : ''}`}>
                                <button
                                    className="contact-card-header"
                                    onClick={() => setExpandedId(isExpanded ? null : contact.id)}
                                >
                                    <div className="contact-card-left">
                                        {!contact.read && <span className="unread-dot" />}
                                        <div className="contact-identity">
                                            <span className="contact-name">{name}</span>
                                            <span className="contact-email">{contact.email}</span>
                                        </div>
                                    </div>
                                    <div className="contact-card-right">
                                        <span className="contact-date">
                                            {new Date(contact.created).toLocaleDateString()}
                                        </span>
                                        <span className={`contact-chevron ${isExpanded ? 'open' : ''}`}>›</span>
                                    </div>
                                </button>

                                {isExpanded && (
                                    <div className="contact-card-body">
                                        {contact.phone_num && (
                                            <p className="contact-phone">Phone: {contact.phone_num}</p>
                                        )}
                                        <p className="contact-message">{contact.message}</p>
                                        <div className="contact-card-actions">
                                            <button
                                                className={contact.read ? 'btn-secondary' : 'btn-primary'}
                                                onClick={() => toggleRead(contact)}
                                            >
                                                {contact.read ? 'Mark as Unread' : 'Mark as Read'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}
