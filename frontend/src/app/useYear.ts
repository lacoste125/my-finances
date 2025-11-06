import {useAppSelector} from "@app/hooks";

export const useYear = () => {
  return useAppSelector(state => state.payments.year);
};