import PageAnchor from '@/layout/components/PageAnchor';

export default () => {
  return (
    <PageAnchor
      anchorProps={{
        items: [
          {
            key: 'part-1',
            href: '#part-1',
            title: 'Part 1',
          },
          {
            key: 'part-2',
            href: '#part-2',
            title: 'Part 2',
          },
          {
            key: 'part-3',
            href: '#part-3',
            title: 'Part 3',
          },
        ],
      }}
    >
      <div id="part-1" style={{ height: '100vh', background: 'rgba(255,0,0,0.02)' }}>
        Part 1
      </div>
      <div id="part-2" style={{ height: '100vh', background: 'rgba(0,255,0,0.02)' }}>
        Part 2
      </div>
      <div id="part-3" style={{ height: '100vh', background: 'rgba(0,0,255,0.02)' }}>
        Part 3
      </div>
    </PageAnchor>
  );
};
