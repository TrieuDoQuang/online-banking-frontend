// Transfer.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import InputItem from "../../components/InputItem";
import { useNavigation } from "@react-navigation/native";
import CustomerService from "../../services/CustomerService";
import PaymentAccountService from "../../services/PaymentAccountService";
import { TransactionData, PaymentAccountData, CustomerData } from "../../data";
import { useAuth } from "../../hooks";
import { useData } from "../../context/DataProvider";

const Transfer = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState("");

  const [sender, setSender] = useState(CustomerData);
  const [defaultPaymentAccount, setDefaultPaymentAccount] =
    useState(PaymentAccountData);
  const [transaction, setTransaction] = useState({
    ...TransactionData,
    transaction_remark: "",
  });

  const { getCustomerById } = CustomerService();
  const { getCustomerNameByAccountNumber, getDefaultPaymentAccount } =
    PaymentAccountService();
  const { customerId } = useAuth();
  const { setTransaction: setTransactionContext } = useData();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchReceiverName = async () => {
      if (transaction.receiver_account_number.length === 10) {
        try {
          const response = await getCustomerNameByAccountNumber(
            transaction.receiver_account_number
          );
          setTransaction((prevTransaction) => ({
            ...prevTransaction,
            receiver_account_name: response.data.result,
          }));
        } catch (error) {
          console.error("Failed to fetch customer name:", error);
        }
      }
    };

    fetchReceiverName();
  }, [transaction.receiver_account_number]);

  useEffect(() => {
    const fetchSenderData = async () => {
      try {
        const response = await getCustomerById(customerId);
        const senderData = response.data.result;
        setSender(senderData);
        setTransaction((prevTransaction) => ({
          ...prevTransaction,
          transaction_remark: senderData.name + " Chuyen tien",
        }));
      } catch (error) {
        console.error("Failed to fetch sender data:", error);
      }
    };

    const fetchDefaultPaymentAccount = async () => {
      try {
        const response = await getDefaultPaymentAccount(customerId);
        const defaultAccount = response.data.result;
        setDefaultPaymentAccount(defaultAccount);
        setTransaction((prevTransaction) => ({
          ...prevTransaction,
          sender_account_number: defaultAccount.account_number,
        }));
      } catch (error) {
        console.error("Failed to fetch default payment account:", error);
      }
    };

    fetchDefaultPaymentAccount();
    fetchSenderData();
  }, []);

  const handleConfirmTransaction = () => {
    if (
      transaction.receiver_account_number &&
      transaction.receiver_account_name &&
      transaction.amount &&
      transaction.transaction_remark
    ) {
      setModalVisible(true);
    } else {
      alert("Please fill in all fields before confirming the transaction.");
    }
  };

  const handlePinSubmit = async () => {
    const response = await getCustomerById(customerId);
    const existingPinNumber = response.data.result.pin_number;

    if (String(existingPinNumber) === pin) {
      setTransactionContext(transaction);
      navigation.navigate("ConfirmTransaction");
    } else {
      // Set notification for wrong PIN
    }

    setModalVisible(false);
  };

  const handleInputChange = (field, value) => {
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [field]: value,
    }));
  };

  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <ScrollView>
        <View className="p-3 pt-10">
          <View className="h-[120px]">
            <Text className="text-sm mb-2">Source Payment Account</Text>
            <View className="bg-slate-50 rounded-md">
              <View className="flex-row p-[9px] items-center">
                <FontAwesomeIcon icon={faUser} color="orange" size={25} />
                <View className="ml-4 mr-12">
                  <Text>
                    {defaultPaymentAccount.account_number} - {sender.name}
                  </Text>
                  <Text className="text-lg font-bold">
                    {defaultPaymentAccount.current_balance
                      .toLocaleString("en-US")
                      .replace(/,/g, ".")}{" "}
                    VND
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <View className="gap-1">
              <Text className="text-sm">To</Text>
              <View className="bg-slate-50 p-[9px] rounded-md mb-10">
                <InputItem
                  title="Account Number"
                  value={transaction.receiver_account_number}
                  onChangeText={(value) =>
                    handleInputChange("receiver_account_number", value)
                  }
                />
                <InputItem
                  title="Account Name"
                  value={transaction.receiver_account_name}
                />
                <InputItem
                  title="Amount"
                  value={transaction.amount}
                  onChangeText={(value) => handleInputChange("amount", value)}
                />
                <InputItem
                  title="Transaction Remark"
                  value={transaction.transaction_remark}
                  onChangeText={(value) =>
                    handleInputChange("transaction_remark", value)
                  }
                />
                <View className="mt-2">
                  <TouchableOpacity
                    className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-black"
                    onPress={handleConfirmTransaction}
                  >
                    <Text className="text-center text-md font-bold text-slate-50">
                      Confirm Transaction
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          className="flex-1 justify-center items-center mx-8 my-52 rounded-lg"
          style={{ backgroundColor: "rgba(1, 1, 1, 0.8)" }}
        >
          <View className="bg-white p-6 rounded-lg w-full">
            <Text className="text-lg font-bold mb-4 text-slate-50">
              Enter Your PIN
            </Text>
            <TextInput
              className="border-2 border-gray-300 p-2 mb-4 rounded-md text-slate-50"
              keyboardType="numeric"
              secureTextEntry={true}
              value={pin}
              onChangeText={setPin}
            />
            <TouchableOpacity
              className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-black mb-4"
              onPress={handlePinSubmit}
            >
              <Text className="text-center text-slate-50 font-bold">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Transfer;