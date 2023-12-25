import { motion } from 'framer-motion';

const Square = ({ color }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: color,
        margin: '5px',
      }}
    />
  );
};

const Grid = () => {
  const colors = Array.from({ length: 100 }, () => "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"));

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {colors.map((color, index) => (
        <Square key={index} color={color} />
      ))}
    </div>
  );
};

export default Grid;