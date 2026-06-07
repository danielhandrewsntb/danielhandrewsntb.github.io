const { useState, useEffect, useRef } = React;

const brands = [
  { id: 1, src: "Argon18.gif", alt: "Argon" },
  { id: 2, src: "Cervelo.png", alt: "Cervelo" },
  { id: 3, src: "Ibis.png", alt: "Ibis" },
  { id: 4, src: "Norco.jpg", alt: "Norco"},
  { id: 5, src: "Kona.png", alt: "Kona"},

  
];

function BrandLogo({ src, alt }) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const offsetRef = useRef({
    x: Math.random() * 10 - 5,  
    y: Math.random() * 10 - 5,
    speed: Math.random() * 0.02 + 0.01
  });
  const frameRef = useRef();        
  const timeRef = useRef(Math.random() * 100);  

  useEffect(() => {
    const animate = () => {
      timeRef.current += offsetRef.current.speed;
      setPos({
        x: Math.sin(timeRef.current) * 4,   
        y: Math.cos(timeRef.current) * 4,   
      });
      frameRef.current = requestAnimationFrame(animate);
    };

    if (!hovered) {
      frameRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frameRef.current);
      setPos({ x: 0, y: 0 }); // snap back to center on hover
    }

    return () => cancelAnimationFrame(frameRef.current);
  }, [hovered]);

  return (
    <img
      src={src}
      alt={alt}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: hovered ? '200px' : '150px',
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: 'width 0.3s ease',  // smooth size change on hover
        cursor: 'pointer',
        margin: '20px',
      }}
    />
  );
}

function BrandSection() {
  return (
    <section style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '60px 20px',
      borderTop: '1px solid #ddd',
      marginTop: '40px',
    }}>
      {brands.map(brand => (
        <BrandLogo key={brand.id} src={brand.src} alt={brand.alt} />
      ))}
    </section>
  );
}

ReactDOM.createRoot(document.getElementById('brand-section')).render(
  <BrandSection />
);