import styled from 'styled-components';

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SkillRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const SkillIcon = styled.i`
  font-size: 2rem;
  color: var(--tertiary);
  width: 40px;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 220, 229, 0.3);
`;

const SkillContent = styled.div`
  flex: 1;
`;

const SkillLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
  font-weight: bold;
  color: var(--on-surface);
`;

const SkillBarTrack = styled.div`
  width: 100%;
  height: 8px;
  background: var(--surface-low);
  border-radius: 4px;
  overflow: hidden;
`;

const SkillBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--tertiary));
  width: ${({ $show, $level }) => $show ? $level : 0}%;
  transition: width 1.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(255, 177, 196, 0.5);
`;

export default function SkillList({ skills, show }) {
  return (
    <SkillsContainer>
      {skills.map((skill, index) => (
        <SkillRow key={index}>
          <SkillIcon className={skill.icon} />
          <SkillContent>
            <SkillLabel>
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </SkillLabel>
            <SkillBarTrack>
              <SkillBarFill $show={show} $level={skill.level} />
            </SkillBarTrack>
          </SkillContent>
        </SkillRow>
      ))}
    </SkillsContainer>
  );
}