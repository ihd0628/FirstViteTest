import { useCache } from "../contexts/CacheProvider";
import useFetchWithCache from "../hooks/useFetchWithCache";

interface ResponseType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Entrance = () => {
  const apiURL = "https://jsonplaceholder.typicode.com/todos/1";
  const { setCache } = useCache();
  const { data } = useFetchWithCache<ResponseType>({ url: apiURL });

  const cacheModifyyButton = () => {
    console.log("흠 돼었나");
    setCache(apiURL, {
      userId: 1,
      id: 1,
      title: "쿜쿄쿄쿄쿜ㅋ쿄쿄쿄쿄쿜",
      completed: false,
    });
  };

  return (
    <>
      <div>{data?.title}</div>
      <button onClick={cacheModifyyButton}>이거슨 버튼!!</button>
    </>
  );
};

export default Entrance;
