/* General imports */
import { styled } from 'nativewind'
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SplashScreen, Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

/* Images */
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'

/* Fonts */
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    null | boolean
  >(null)

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUserAuthenticated(!!token)
    })
  }, [])

  /* Importando as fonts usando o useFonts */
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })
  /* Só rodando se tiver as fotns */
  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground /* Propriedade do React Native, se comporta como: <div> <img src="" /> </div> */
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }} /* para editar a img dentro da div */
    >
      <StyledStripes className="absolute bottom-5 left-2" />
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  )
}
