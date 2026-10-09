import logo from '../../assets/elite_Academy_logo.jpg';

export default function BrandLogo({ size = 'size-10', text = true, className = '' }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logo}
        alt="Elite Academy logo"
        width="40"
        height="40"
        className={`${size} rounded-lg object-cover shadow-glow ring-1 ring-white/10`}
      />
      {text && (
        <span className="font-bold tracking-tight text-lg">
          ELITE <span className="text-gradient">ACADEMY</span>
        </span>
      )}
    </span>
  );
}
