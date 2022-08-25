import { Tab, TabList, Tabs } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Range = {
  hour: 0,
  day: 1,
  week: 2,
};

const TimeTab = () => {
  const router = useRouter();
  const h = router.query.span as string;

  return (
    <>
      <Tabs
        index={Range[h]}
        isFitted
        variant="enclosed"
        mx="24px"
        mb="20px"
        size="md"
      >
        <TabList>
          <Tab key={'hour'} _selected={{ color: 'gray.200', bg: 'blue.700' }}>
            <Link href={`${router.asPath}../hour`}>Hour</Link>
          </Tab>
          <Tab key={'day'} _selected={{ color: 'gray.200', bg: 'blue.700' }}>
            <Link href={`${router.asPath}../day`}>Day</Link>
          </Tab>
          <Tab key={'week'} _selected={{ color: 'gray.200', bg: 'blue.700' }}>
            <Link href={`${router.asPath}../week`}>Week</Link>
          </Tab>
        </TabList>
      </Tabs>
    </>
  );
};
export default TimeTab;
