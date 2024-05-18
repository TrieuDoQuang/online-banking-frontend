import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import images from "../../../assets";
import { Category } from "../../../components";

const Rewards = () => {
  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <ScrollView>
        <View className="p-3 pt-5">
          <View className="">
            <View className="bg-slate-50 rounded-md">
              <View className="flex-row p-[9px] items-center">
                <FontAwesomeIcon icon={faUser} color="orange" size={25} />
                <View className="ml-4 mr-12">
                  <Text>032299999 - Chau Hoang Gia Dat</Text>
                  <Text className="text-lg font-bold">
                    Reward Points: 150 RWP
                  </Text>
                </View>
                <TouchableOpacity>
                  <FontAwesomeIcon icon={faChevronDown} color="#3C84AB" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="my-5">
            <Text className="text-sm mb-2">Shopping Voucher</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Category
                image={images.background}
                title="Voucher 200,000 VND purchasing at..."
                price="250"
              />
              <Category
                image={images.background}
                title="Voucher 200,000 VND purchasing at..."
                price="250"
              />
              <Category
                image={images.background}
                title="Voucher 200,000 VND purchasing at..."
                price="250"
              />
            </ScrollView>
          </View>
          <View className="my-5">
            <Text className="text-sm mb-2">Culinary Voucher</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Category
                image={images.background}
                title="Voucher 200,000 VND purchasing at..."
                price="250"
              />
              <Category
                image={images.background}
                title="Voucher 200,000 VND purchasing at..."
                price="250"
              />
              <Category
                image={images.background}
                title="Voucher 200,000 VND purchasing at..."
                price="250"
              />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Rewards;
