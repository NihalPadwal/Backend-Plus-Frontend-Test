import SearchContainer from "@/ui-components/search/SearchContainer";

type Props = {
  searchParams: { value: string };
};

const Index = async (props: Props) => {
  return (
    <div className="w-full px-20 py-8">
      <SearchContainer searchValue={props.searchParams.value} />
    </div>
  );
};

export default Index;
