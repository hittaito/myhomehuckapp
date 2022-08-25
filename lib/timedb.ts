import { FluxResultObserver, InfluxDB } from '@influxdata/influxdb-client';

const url = process.env.INFLUX_URL || '';
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG || '';
const bucket = process.env.INFLUX_BUCKET;

export const metrics = ['remoTemp', 'localTemp'] as const;
type metricType = typeof metrics[number];
export const isMetrics = (k: any): k is metricType => {
  return metrics.includes(k);
};

export const rangeMap = {
  hour: { i: 'h', s: '1m' },
  day: { i: 'd', s: '5m' },
  week: { i: 'w', s: '30m' },
} as const;
type rangeType = keyof typeof rangeMap;
export const isRange = (k: any): k is rangeType => {
  return !!rangeMap[k];
};

export type TimeData = {
  time: string;
  value: number;
  field: string;
};

export const timedbQuery = async (r: rangeType, k: metricType) => {
  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);

  const fluxQuery = judgeQuery(r, k);

  const result: TimeData[] = [];
  return await new Promise<TimeData[]>((resolve, reject) => {
    queryApi.queryRows(fluxQuery, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row) as TimeData;
        result.push(o);
      },
      error(error) {
        console.error(error);
        reject;
      },
      complete() {
        resolve(result);
      },
    });
  });
};
const judgeQuery = (r: rangeType, k: metricType) => {
  if (r === 'hour') {
    return `from(bucket:"${bucket}")
        |> range(start: -1${rangeMap[r].i})
        |> filter(fn: (r) => r._measurement == "mqtt_consumer")
        |> filter(fn: (r) => r._field == "${k}")
        |> fill(usePrevious: true)
        |> keep(columns: ["_time", "_value", "_field"])
        |> rename(columns: {_time: "time", _value: "value", _field: "field"})
        `;
  } else {
    return `from(bucket:"${bucket}")
        |> range(start: -1${rangeMap[r].i})
        |> filter(fn: (r) => r._measurement == "mqtt_consumer")
        |> filter(fn: (r) => r._field == "${k}")
        |> fill(usePrevious: true)
        |> window(every: ${rangeMap[r].s})
        |> mean()
        |> duplicate(column: "_stop", as: "_time")
        |> keep(columns: ["_time", "_value", "_field"])
        |> rename(columns: {_time: "time", _value: "value", _field: "field"})
  `;
  }
};
