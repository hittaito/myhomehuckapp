import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ChartView } from '../../../components/chart';
import { Layout } from '../../../components/layout';
import TimeTab from '../../../components/TimeTab';
import { metrics, rangeMap } from '../../../lib/timedb';

export const getStaticPaths = async () => {
  const path = metrics.flatMap((m) =>
    Object.keys(rangeMap).map((k) => ({ params: { field: m, span: k } }))
  );
  return {
    paths: path,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  return {
    props: {},
  };
};

const graph = () => {
  const router = useRouter();
  const { field, span } = router.query;
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    const f = async () => {
      const response = await fetch(`/api/measurements/${field}/${span}`);
      const data = await response.json();

      setViewData(data);
    };
    f();
  }, [router.query]);

  return (
    <Layout>
      <TimeTab></TimeTab>
      <Box w="90%" margin="auto">
        <ChartView timeData={viewData} span={span as string}></ChartView>
      </Box>
    </Layout>
  );
};

export default graph;
