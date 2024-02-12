import React from 'react';
import styles from './IconElement.module.css';

interface IconElementProps {
  icon: string;
  title: string;
  isHovered?: boolean;
}

const IconElement: React.FC<IconElementProps> = ({isHovered,icon, title}) => {
  const isFontAwesomeIcon = icon.startsWith('fa-') || icon.startsWith('fab ');
  const isSVG = icon.endsWith('.svg'); // Simple check for SVG files

  // Prepare your SVG URLs
  const defaultSVG = `url(${icon})`; // Path to your default SVG
  const hoverSVG = `url(${icon}_hover.svg)`; // Path to your SVG for the hover state, assuming you have a way to differentiate it
  console.log(hoverSVG);

  return (
    <div className="icon-element">
      {isFontAwesomeIcon ? (
        <i className={`fas ${icon}`} title={title}></i>
      ) : isSVG ? (
        <div
          className={styles.iconImage}
          style={{ backgroundImage: isHovered ? hoverSVG : defaultSVG }}
        ></div>
      ) : (
        <img className={styles.iconImage} src={icon} alt={title} />
      )}
    </div>
  );
};

export default IconElement;
