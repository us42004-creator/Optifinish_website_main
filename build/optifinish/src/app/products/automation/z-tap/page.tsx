export const metadata = {
  title: 'Z-TAP Robot System | OptiFinish',
  description:
    'Z-TAP — mimic once, perfect every time. 6-axis powder coating robot with IMU motion capture. Proprietary OptiFinish technology.',
};

export default function ZTapPage() {
  return (
    <iframe
      src="http://localhost:4000"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        zIndex: 9999,
      }}
      title="Z-TAP Robot System"
    />
  );
}
