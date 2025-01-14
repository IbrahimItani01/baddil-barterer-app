import React from "react";
import TabScreen from "@/components/tabs/base/TabScreen";
import ProfileHeader from "@/components/tabs/profile/ProfileHeader";
import ProfileSection from "@/components/tabs/profile/ProfileSection";
import SettingsSection from "@/components/tabs/profile/SettingsSection";

export default function ProfileScreen() {
	return (
		<TabScreen title='Profile'>
			<ProfileHeader />

			<ProfileSection />

			<SettingsSection />
		</TabScreen>
	);
}
