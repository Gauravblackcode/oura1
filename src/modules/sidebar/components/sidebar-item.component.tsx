import styled from '@emotion/styled';
import { ChevronDown, ChevronUp, CornerDownRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { carterColors } from 'shyftlabs-dsl';
import useElementPosition from '@/contexts/useElementPosition/useElementPosition.hook';

export type SidebarItemType = {
  id: number;
  label: string;
  icon?: React.ReactNode;
  link: string;
  subCategories?: SidebarItemType[];
  testId?: string;
  assist?: string;
  show?: boolean;
  mobileOnly?: boolean;
  type?: string;
};

interface SidebarItemProps {
  item: SidebarItemType;
  isActive: boolean;
  isSubItem?: boolean;
  sidebarCollapsed?: boolean;
  showSubItems?: boolean;
  onToggleSubItems?: () => void;
  onItemClick: (link: string) => void;
  index?: number;
  activeSubItemIndex?: number | undefined;
}

const ItemContainer = styled.div<{ active?: boolean; isSubItem?: boolean }>`
  color: ${props => (props.active ? carterColors['brand-600'] : '#456173')};
  font-family: inherit;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: ${props => (props.isSubItem ? '8px 8px 8px 40px' : '8px')};
  justify-content: space-between;
  border-radius: 3px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: ${carterColors['brand-600']};
    background-color: #f2f2fd;
  }

  ${props =>
    props.active &&
    `
    color: ${carterColors['brand-600']};
    background-color: #f2f2fd;
  `}
`;

const RoundedCornerIcon = styled(CornerDownRight)<{ visible: boolean }>`
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease;
  position: absolute;
  left: 33.6px;
`;

const MenuIcon = styled.div<{ sidebarCollapsed: boolean }>`
  margin-right: ${props => (!props.sidebarCollapsed ? '8px' : 0)};
  height: 24px;
  width: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SidebarContent = styled.div`
  display: flex;
  align-items: center;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const MenuText = styled.span`
  transition: opacity 0.2s ease;
  white-space: wrap;
`;

const StyledSubItemIndicator = styled.div<{ isActive: boolean; positionTop: number }>`
  position: absolute;
  left: 35px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 2px;
  background: ${carterColors['brand-600']};
  height: ${({ isActive }) => (isActive ? '20px' : '40px')};
  top: ${({ positionTop }) => `${positionTop - 4}px`};
`;

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isActive,
  sidebarCollapsed = false,
  isSubItem = false,
  showSubItems,
  onToggleSubItems,
  onItemClick,
  index,
  activeSubItemIndex,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const sideBarItemRef = useRef(null);
  const position = useElementPosition(sideBarItemRef);
  return (
    <ItemContainer
      active={isActive}
      isSubItem={isSubItem}
      ref={sideBarItemRef}
      onClick={() => onItemClick(item.link)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SidebarContent>
        {item.icon && <MenuIcon sidebarCollapsed={sidebarCollapsed}>{item.icon}</MenuIcon>}
        {!sidebarCollapsed && <MenuText>{item.label}</MenuText>}
      </SidebarContent>
      {item.subCategories && !sidebarCollapsed && !isSubItem && (
        <div
          onClick={e => {
            e.stopPropagation();
            onToggleSubItems?.();
          }}
        >
          {showSubItems ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      )}
      {isSubItem && (activeSubItemIndex ?? -1) >= (index ?? -1) && (
        <StyledSubItemIndicator isActive={(activeSubItemIndex ?? -1) === (index ?? -1)} positionTop={position.top} />
      )}
      {isSubItem && <RoundedCornerIcon size={15} strokeWidth={3} visible={isHovered || isActive} />}
    </ItemContainer>
  );
};

export default SidebarItem;
