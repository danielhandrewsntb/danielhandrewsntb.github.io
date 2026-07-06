const { useState } = React;

const MISSILES = [
	{
		id: 1,
		name: "AIM-174B",
		image: "a174b.jpg",
		company: "Raytheon",
		unitCost: 4300000,
		range: "240+ km",
		speed: "Mach 3.5",
		guidance: "Active radar homing",
	},
	{
		id: 2,
		name: "AIM-9X Sidewinder",
		image: "aim9x.jpg",
		company: "Raytheon",
		unitCost: 450000,
		range: "35 km",
		speed: "Mach 2.5",
		guidance: "Infrared homing",
	},
	{
		id: 3,
		name: "AIM-120C-7 AMRAAM",
		image: "amrm.jpg",
		company: "Raytheon",
		unitCost: 1100000,
		range: "105 km",
		speed: "Mach 4",
		guidance: "Active radar homing",
	},
	{
		id: 4,
		name: "Meteor",
		image: "meteor-v2-01.jpg",
		company: "MBDA",
		unitCost: 3000000,
		range: "200+ km",
		speed: "Mach 4",
		guidance: "Active radar homing, ramjet-sustained",
	},
	{
		id: 5,
		name: "PL-10",
		image: "pl10.jpg",
		company: "China Airborne Missile Academy",
		unitCost: null,
		range: "20 km",
		speed: "Mach 4",
		guidance: "Imaging infrared",
	},
	{
		id: 6,
		name: "PL-15",
		image: "pl15.jpg",
		company: "China Airborne Missile Academy",
		unitCost: null,
		range: "200-300 km",
		speed: "Mach 4+",
		guidance: "Active radar homing, AESA seeker",
	},
	{
		id: 7,
		name: "R-37M",
		image: "r37.jpg",
		company: "Vympel NPO",
		unitCost: null,
		range: "300-400 km",
		speed: "Mach 6",
		guidance: "Active radar homing",
	},
	{
		id: 8,
		name: "R-77",
		image: "r77.jpg",
		company: "Vympel NPO",
		unitCost: 500000,
		range: "80-100 km",
		speed: "Mach 4",
		guidance: "Active radar homing",
	},
	{
		id: 9,
		name: "Sky Sword II",
		image: "skyspear.jpg",
		company: "NCSIST (Taiwan)",
		unitCost: null,
		range: "100 km",
		speed: "Mach 4",
		guidance: "Active radar homing",
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

function AirToAir() {
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
			<h1>Air to Air</h1>

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