const { useState, useEffect, useRef } = React;

const Partnerships = [
  { id: 1, src: "and.png", alt: "Anduril" },
  { id: 2, src: "bo.webp", alt: "Boeing" },
  { id: 3, src: "ga.svg.webp", alt: "General Atomics" },
  { id: 4, src: "gd.png", alt: "General Dynamics" },
  { id: 5, src: "lhm.svg.webp", alt: "Lockheed" },
  { id: 6, src: "ng.svg", alt: "Northrop" },
  { id: 7, src: "rtx.svg", alt: "RTX" },
  { id: 8, src: "pltr.png", alt: "Palantir" },
];

function PartnerLogo({ src, alt, offset }) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const offsetRef = useRef({
    x: Math.random() * 10 - 5,
    y: Math.random() * 10 - 5,
    speed: Math.random() * 0.02 + 0.01,
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
      setPos({ x: 0, y: 0 });
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
        width: hovered ? "200px" : "150px",
        marginTop: `${offset}px`,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "width 0.3s ease",
        cursor: "pointer",
        margin: "20px",
      }}
    />
  );
}

function PartnerSection() {
  return (
    <section
      style={{
        padding: "60px 20px",
        borderTop: "1px solid #222222",
        background: "#000000",
        position: "relative",
        zIndex: 1,
      }}
    >
      <h2
        style={{
          color: "#ffffff",
          fontFamily: '"Alliance No.2", Arial, sans-serif',
          fontWeight: 700,
          fontSize: "clamp(24px, 3vw, 36px)",
          letterSpacing: "0.02em",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Our Partnerships
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {Partnerships.map((brand, index) => (
          <PartnerLogo
            key={brand.id}
            src={brand.src}
            alt={brand.alt}
            offset={(index % 3) * 30}
          />
        ))}
      </div>
    </section>
  );
}