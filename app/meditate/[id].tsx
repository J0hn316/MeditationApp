import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ImageBackground, Pressable } from 'react-native';

import meditationImages from '@/constants/meditation-images';
import AppGradient from '@/components/AppGradient';
import CustomButton from '@/components/CustomButton';

const Meditate = () => {
  const { id } = useLocalSearchParams();
  const [seconds, setSeconds] = useState(10);
  const [isMeditating, setIsMeditating] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>();

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    //Exit
    if (seconds === 0) {
      setIsMeditating(false);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [seconds, isMeditating]);

  const toggleMeditationSessionStatus = async () => {
    if (seconds === 0) setSeconds(10);
    setIsMeditating(!isMeditating);
  };

  // Format the time left to ensure two digits are displayed.
  const formattedTimeMinutes = String(Math.floor(seconds / 60)).padStart(
    2,
    '0'
  );
  const formattedTimeSeconds = String(seconds % 60).padStart(2, '0');

  return (
    <View className="flex-1">
      <ImageBackground
        source={meditationImages[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={['transparent', 'rgba(0,0,0,0.8)']}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-16 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>

          <View className="mb-5">
            <CustomButton
              title="Start Meditation"
              onPress={() => setIsMeditating(true)}
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};
export default Meditate;
