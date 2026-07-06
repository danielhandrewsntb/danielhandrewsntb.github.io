const { useState, useEffect } = React;

const BG_IMAGES = ["dcsf16jpg.jpg", "rr.jpg", "sub.jpg","spx.jpg"];

function BackgroundSlider() {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % BG_IMAGES.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="bg-slider">
			{BG_IMAGES.map((img, index) => (
				<div
					key={img}
					className={`bg-slide ${index === activeIndex ? "active" : ""}`}
					style={{ backgroundImage: `url(${img})` }}
				/>
			))}
		</div>
	);
}