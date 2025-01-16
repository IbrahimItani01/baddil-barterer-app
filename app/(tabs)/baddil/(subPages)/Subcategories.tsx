import React from "react";
import CustomText from "@/components/base/CustomText";
import TabScreen from "@/components/tabs/base/TabScreen";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector } from "@/store/hooks"; // Import custom selector hook
import { capitalizeFirstLetter } from "@/lib/utils/general.utils";
import SubcategoryCard from "@/components/tabs/baddil/SubcategoryCard";
import { fontFamily } from "@/lib/constants/fonts.constant";

const Subcategories = () => {
  const { id } = useLocalSearchParams(); // Extract category ID from route params
  const router = useRouter();
  
  // Access the categories slice from Redux state
  const category = useAppSelector((state) => 
    state.categories.categories.find((category) => category.id === String(id))
  );

  const handleNavigation = (subcategoryId: string) => {
    router.push(`/(tabs)/baddil/(details)/DetailsPage?id=${id}&subId=${subcategoryId}`);
  };

  return (
    <TabScreen
      title={category ? capitalizeFirstLetter(category.name) : "Subcategories"}
    >
      {category && category.subcategories.length > 0 ? (
        <>
          <CustomText
            content={`Choose a subcategory for ${capitalizeFirstLetter(category.name)}`}
            style={{
              fontFamily: fontFamily.NunitoSans.SemiBold,
            }}
          />
          {category.subcategories.map((subcategory) => (
            <SubcategoryCard
              subcategory={subcategory}
              onPress={() => handleNavigation(subcategory.id)}
              key={subcategory.id}
            />
          ))}
        </>
      ) : (
        <CustomText
          style={{
            fontFamily: fontFamily.NunitoSans.SemiBold,
            fontSize: 16,
            alignSelf: "center",
          }}
          content="No subcategories found"
        />
      )}
    </TabScreen>
  );
};

export default Subcategories;
