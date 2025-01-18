export default function Header({ userName, imgProfile }) {
  return (
    <header className="flex items-center p-[1.1rem] bg-card border-b border-border shadow-sm">
      <img
        className="w-10 h-10 rounded-full object-cover"
        src={imgProfile}
        alt="User Profile"
        width={50}
        height={50}
      />
      <div className="ml-4 min-w-0">
        <p className="text-sm font-medium text-primary truncate">{userName}</p>
        <p className="text-xs text-muted-foreground truncate">Contact Info</p>
      </div>
    </header>
  );
}
