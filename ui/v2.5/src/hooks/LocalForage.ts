import localForage from "localforage";
import _ from "lodash";
import React, { Dispatch, SetStateAction, useEffect } from "react";

interface IInterfaceQueryConfig {
  filter: string;
  itemsPerPage: number;
  currentPage: number;
}

type IInterfaceConfig = Record<string, IInterfaceQueryConfig>;

export interface IChangelogConfig {
  versions: Record<string, boolean>;
}

interface ILocalForage<T> {
  data?: T;
  error: Error | null;
  loading: boolean;
}

const Loading: Record<string, boolean> = {};
const Cache: Record<string, {}> = {};

export function useLocalForage<T>(
  key: string,
  defaultValue: T = {} as T
): [ILocalForage<T>, Dispatch<SetStateAction<T>>] {
  const [error, setError] = React.useState<Error | null>(null);
  const [data, setData] = React.useState<T>(Cache[key] as T);
  const [loading, setLoading] = React.useState(Loading[key]);

  useEffect(() => {
    async function runAsync() {
      try {
        const serialized = await localForage.getItem<string>(key);
        const parsed = JSON.parse(serialized ?? "null");
        if (!Object.is(parsed, null)) {
          setData(parsed);
          Cache[key] = parsed;
        } else {
          setData(defaultValue);
          Cache[key] = defaultValue;
        }
        setError(null);
      } catch (err) {
        if (err instanceof Error) setError(err);
        Cache[key] = defaultValue;
      } finally {
        Loading[key] = false;
        setLoading(false);
      }
    }

    if (!loading && !Cache[key]) {
      Loading[key] = true;
      setLoading(true);
      runAsync();
    }
  }, [loading, key, defaultValue]);

  useEffect(() => {
    if (!_.isEqual(Cache[key], data)) {
      Cache[key] = {
        ...Cache[key],
        ...data,
      };
      localForage.setItem(key, JSON.stringify(Cache[key]));
    }
  });

  const isLoading = loading || loading === undefined;

  return [{ data, error, loading: isLoading }, setData];
}

export const useInterfaceLocalForage = () =>
  useLocalForage<IInterfaceConfig>("interface");

export const useChangelogStorage = () =>
  useLocalForage<IChangelogConfig>("changelog");
