import { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup, Badge, Alert } from 'react-bootstrap';
import { BsSearch, BsCheckCircleFill } from 'react-icons/bs';
import { supabase } from '../services/supabase';

const ModalConfirm = ({ show, handleClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [guests, setGuests] = useState([]);
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      fetchGuests();
    }
  }, [show]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredGuests([]);
    } else {
      const filtered = guests.filter(guest =>
        guest.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGuests(filtered);
    }
  }, [searchTerm, guests]);

  const fetchGuests = async () => {
    try {
      const { data, error } = await supabase
        .from('convidados')
        .select('*')
        .eq('isConfirmed', false)
        .order('nome', { ascending: true });

      if (error) throw error;
      setGuests(data);
    } catch (err) {
      console.error('Erro ao buscar convidados:', err);
      setError('Erro ao carregar lista de convidados');
    }
  };

  const toggleGuestSelection = (guest) => {
    setSelectedGuests(prev => {
      const isSelected = prev.find(g => g.id === guest.id);
      if (isSelected) {
        return prev.filter(g => g.id !== guest.id);
      } else {
        return [...prev, guest];
      }
    });
  };

  const handleConfirm = async () => {
    if (selectedGuests.length === 0) {
      setError('Selecione pelo menos um convidado');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const updates = selectedGuests.map(guest =>
        supabase
          .from('convidados')
          .update({ isConfirmed: true })
          .eq('id', guest.id)
      );

      await Promise.all(updates);

      setSuccess(true);
      setSelectedGuests([]);
      setSearchTerm('');
      await fetchGuests();

      setTimeout(() => {
        setSuccess(false);
        handleClose();
      }, 2000);
    } catch (err) {
      console.error('Erro ao confirmar presença:', err);
      setError('Erro ao confirmar presença. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSearchTerm('');
    setSelectedGuests([]);
    setFilteredGuests([]);
    setSuccess(false);
    setError('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal} centered>
      <Modal.Header closeButton style={{ borderBottom: '2px solid #d4af37' }}>
        <Modal.Title style={{ color: '#d4af37', fontWeight: 'bold' }}>
          Confirmar Presença
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {success && (
          <Alert variant="success" className="d-flex align-items-center">
            <BsCheckCircleFill className="me-2" />
            Presença confirmada com sucesso!
          </Alert>
        )}

        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Label style={{ color: '#d4af37', fontWeight: 'bold' }}>
            Pesquisar convidado
            <p style={{ fontWeight: 'normal', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: '0' }}>
                Caso o nome não apareça, verifique se já não foi confirmado, ou contate a aniversariante
            </p>
          </Form.Label>
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="Digite o nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '35px' }}
            />
            <BsSearch
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#d4af37'
              }}
            />
          </div>
        </Form.Group>

        {selectedGuests.length > 0 && (
          <div className="mb-3">
            <small style={{ color: '#d4af37', fontWeight: 'bold' }}>
              Selecionados ({selectedGuests.length}):
            </small>
            <div className="d-flex flex-wrap gap-2 mt-2">
              {selectedGuests.map(guest => (
                <Badge
                  key={guest.id}
                  bg="warning"
                  text="dark"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleGuestSelection(guest)}
                >
                  {guest.nome} ✕
                </Badge>
              ))}
            </div>
          </div>
        )}

        {filteredGuests.length > 0 && (
          <ListGroup style={{ maxHeight: '250px', overflowY: 'auto' }}>
            {filteredGuests.map(guest => (
              <ListGroup.Item
                key={guest.id}
                action
                active={selectedGuests.find(g => g.id === guest.id)}
                onClick={() => toggleGuestSelection(guest)}
                style={{
                  cursor: 'pointer',
                  borderColor: selectedGuests.find(g => g.id === guest.id) ? '#d4af37' : undefined
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>{guest.nome}</span>
                  {selectedGuests.find(g => g.id === guest.id) && (
                    <BsCheckCircleFill style={{ color: '#d4af37' }} />
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {searchTerm && filteredGuests.length === 0 && (
          <div className="text-center text-muted py-3">
            Nenhum convidado encontrado
          </div>
        )}
      </Modal.Body>

      <Modal.Footer style={{ borderTop: '2px solid #d4af37' }}>
        <Button variant="outline-secondary" onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button
          variant="warning"
          onClick={handleConfirm}
          disabled={loading || selectedGuests.length === 0}
        >
          {loading ? 'Confirmando...' : `Confirmar (${selectedGuests.length})`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
