import PropTypes from 'prop-types';
import { useState } from 'react';
import { motion } from 'framer-motion';

const InfoCard = ({ id, title, body, index }) => {
  const [showMore, setShowMore] = useState(false);

  const getBgStyle = (id) => {
    const num = parseInt(id, 10) || 0;
    if (num % 4 === 0) return 'bg-gradient-to-b from-fuchsia-950 to-fuchsia-400';
    if (num % 4 === 1) return 'bg-[url("/images/image1.png")] bg-cover bg-center';
    if (num % 4 === 2) return 'bg-[url("/images/image2.png")] bg-cover bg-center';
    return 'bg-[url("/images/image3.png")] bg-cover bg-center';
  };

  return (
    <motion.div
      key={id}
      className={`${getBgStyle(index)} relative ${showMore ? 'pt-6' : 'pt-28'} pb-6 pr-6 pl-6 shadow-2xl max-w-sm h-80 text-white`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <h2 className="text-left text-xl font-bold mb-4 text-yellow-300">{title}</h2>
        <p className={`mb-4 text-lg ${showMore ? 'max-h-80 overflow-y-auto' : 'max-h-24 overflow-hidden'}`}>
          {showMore ? body : `${body.substring(0, 100)}...`}
        </p>
        <button 
          className="bg-yellow-300 text-black px-3 py-1 rounded self-end hover:bg-yellow-400 transition"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </motion.div>
  );
};

InfoCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default InfoCard;
