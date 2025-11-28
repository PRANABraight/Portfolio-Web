// src/components/sections/Footer.jsx
import styled from 'styled-components';
import { colors, typography, spacing } from '../../styles/theme';

const FooterContainer = styled.footer`
  padding: ${spacing['2xl']} ${spacing.xl};
  text-align: center;
  border-top: 1px solid ${colors.border.default};
  margin-top: ${spacing['4xl']};
  background: ${colors.background.secondary};
`;

const FooterText = styled.p`
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.sm};
  line-height: ${typography.lineHeight.relaxed};
  font-weight: ${typography.fontWeight.regular};

  span {
    color: ${colors.text.primary};
    font-weight: ${typography.fontWeight.medium};
  }

  .heart {
    color: #FF375F;
    display: inline-block;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        Designed & Built with <span className="heart">❤️</span> by <span>Pranab Rai</span>
        <br />
        © {new Date().getFullYear()} Pranab Rai. All Rights Reserved.
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;