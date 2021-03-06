/* eslint-disable react-hooks/exhaustive-deps */
import { ASSIST_SERVER_URL } from '@env';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TeamInfo } from '../../@types/global/types';
import { RootState } from '../store/reducers';

export default function useTeamInfo() {
  const { token } = useSelector((state: RootState) => state.userReducer);
  const { id } = useSelector((state: RootState) => state.userReducer.selectedTeam);
  const [data, setData] = useState<TeamInfo>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data }: AxiosResponse<TeamInfo> = await axios.get(
          `${ASSIST_SERVER_URL}/team/${id}`,
          {
            headers: { authorization: `Bearer ${token}` },
          },
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData().catch((error) => console.log(error));
  }, []);

  return { data, isLoading };
}
