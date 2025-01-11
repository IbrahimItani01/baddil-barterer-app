import UserBrokers from "@/components/tabs/brokers/UserBrokers";
import AllBrokers from "@/components/tabs/brokers/AllBrokers";
import TabScreen from "@/components/tabs/base/TabScreen";

export default function Tab() {

	return (
		<TabScreen title='Brokers'>
			<UserBrokers />
			<AllBrokers />
		</TabScreen>
	);
}
