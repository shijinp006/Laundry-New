// Templates re-mount on every navigation, so this replays the fade-in on each page change.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade flex flex-1 flex-col">{children}</div>;
}
