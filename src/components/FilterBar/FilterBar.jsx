import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: rgba(19, 19, 20, 0.6);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--outline-variant);
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const SearchInput = styled.input`
  flex: 2;
  background: var(--surface-low);
  border: 1px solid var(--outline-variant);
  color: var(--on-surface);
  padding: 12px 20px;
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 10px rgba(255, 177, 196, 0.2);
  }
`;

const StatusSelect = styled.select`
  flex: 1;
  background: var(--surface-low);
  border: 1px solid var(--outline-variant);
  color: var(--on-surface);
  padding: 12px 35px 12px 20px;
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--tertiary);
  }
`;

export default function FilterBar({ searchTerm, onSearch, statusFilter, onStatusChange }) {
  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Buscar por nombre del proyecto..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <StatusSelect
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="Todos">Todos los estados</option>
        <option value="EN PROCESO">En Proceso</option>
        <option value="ENTREGADO">Entregados</option>
        <option value="CANCELADO">Cancelados</option>
      </StatusSelect>
    </Container>
  );
}