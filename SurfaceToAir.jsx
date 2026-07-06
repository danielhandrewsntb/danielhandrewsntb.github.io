const { useState } = React;

const MISSILES = [
	{
		id: 1,
		name: "S-400 Triumf",
		image: "s400.jpg",
		company: "Almaz-Antey",
		unitCost: null,
		range: "400 km",
		speed: "Mach 14",
		guidance: "Semi-active/active radar homing",
	},
	{
		id: 2,
		name: "RIM-161 SM-3",
		image: "rim161sm3.jpg",
		company: "Raytheon",
		unitCost: 12000000,
		range: "2,500 km",
		speed: "Mach 15.25",
		guidance: "Infrared homing, kinetic kill vehicle",
	},
	{
		id: 3,
		name: "RIM-116 RAM",
		image: "rim116.jpg",
		company: "Raytheon / Diehl Defence",
		unitCost: 900000,
		range: "9 km",
		speed: "Mach 2",
		guidance: "Infrared / passive radar homing",
	},
	{
		id: 4,
		name: "S-300VM (Antey-2500)",
		image: "s300vm.jpg",
		company: "Almaz-Antey",
		unitCost: null,
		range: "200 km",
		speed: "Mach 7.5",
		guidance: "Command guidance, semi-active radar homing",
	},
	{
		id: 5,
		name: "S-500 Prometey",
		image: "s500.jpg",
		company: "Almaz-Antey",
		unitCost: null,
		range: "600 km",
		speed: "Mach 15",
		guidance: "Active radar homing, exo-atmospheric intercept",
	},
	{
		id: 6,
		name: "Rapier",
		image: "rapier.jpg",
		company: "MBDA (formerly BAC)",
		unitCost: 250000,
		range: "8.2 km",
		speed: "Mach 2.5",
		guidance: "Command line-of-sight, radar/optical tracking",
	},
	{
		id: 7,
		name: "Sea Cat",
		image: "seacat.jpg",
		company: "Short Brothers",
		unitCost: null,
		range: "5 km",
		speed: "Mach 0.8",
		guidance: "Manual command line-of-sight (MCLOS)",
	},
];

function formatCost(cost) {
	if (cost === null) return "Not Disclosed";
	return `$${cost.toLocaleString()}`;
}

function MissileCard({ missile }) {
	const [hovered, setHovered] = useState(false);

	return (
		<div
			className="missile-card"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className="missile-card-top">
				<img src={missile.image} alt={missile.name} className="missile-image" />
				<h3>{missile.name}</h3>
				<p className="missile-cost">{formatCost(missile.unitCost)}</p>
				<span className={`expand-icon ${hovered ? "open" : ""}`}>+</span>
			</div>

			<div className={`missile-details ${hovered ? "open" : ""}`}>
				<div className="missile-detail-row">
					<span className="detail-label">Company</span>
					<span className="detail-value">{missile.company}</span>
				</div>
				<div className="missile-detail-row">
					<span className="detail-label">Range</span>
					<span className="detail-value">{missile.range}</span>
				</div>
				<div className="missile-detail-row">
					<span className="detail-label">Speed</span>
					<span className="detail-value">{missile.speed}</span>
				</div>
				<div className="missile-detail-row">
					<span className="detail-label">Guidance</span>
					<span className="detail-value">{missile.guidance}</span>
				</div>

				<button
				className="contact-sales-btn"
				onClick={() => {
					window.location.href = `procurement.html?product=${encodeURIComponent(missile.name)}`;
				}}
			>
				Contact Sales
			</button>
			</div>
		</div>
	);
}
function parseRange(rangeStr) {
	const match = rangeStr.match(/[\d.]+/);
	return match ? parseFloat(match[0]) : 0;
}

function parseSpeed(speedStr) {
	const match = speedStr.match(/[\d.]+/);
	return match ? parseFloat(match[0]) : 0;
}

function SurfaceToAir() {
	const [sortBy, setSortBy] = useState("name");
	const [companyFilter, setCompanyFilter] = useState("all");

	const companies = ["all", ...new Set(MISSILES.map((m) => m.company))];

	let filtered =
		companyFilter === "all"
			? MISSILES
			: MISSILES.filter((m) => m.company === companyFilter);

	let sorted = [...filtered].sort((a, b) => {
	if (sortBy === "name") return a.name.localeCompare(b.name);
	if (sortBy === "cost") {
		if (a.unitCost === null) return 1;
		if (b.unitCost === null) return -1;
		return a.unitCost - b.unitCost;
	}
	if (sortBy === "speed") return parseSpeed(b.speed) - parseSpeed(a.speed);
	if (sortBy === "range") return parseRange(b.range) - parseRange(a.range);
	return 0;
});

	return (
		<section className="air-to-air-page">
			<h1>Surface to Air</h1>

			<div className="controls">
				<div className="control-group">
					<label>Sort by</label>
					<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
						<option value="name">Name</option>
						<option value="cost">Unit Cost</option>
						<option value="speed">Speed</option>
						<option value="range">Range</option>
					</select>
				</div>

				<div className="control-group">
					<label>Company</label>
					<select
						value={companyFilter}
						onChange={(e) => setCompanyFilter(e.target.value)}
					>
						{companies.map((c) => (
							<option key={c} value={c}>
								{c === "all" ? "All Companies" : c}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="missile-grid">
				{sorted.map((missile) => (
					<MissileCard key={missile.id} missile={missile} />
				))}
			</div>
		</section>
	);
}