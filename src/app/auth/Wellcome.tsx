import {
  Button,
  CSSObject,
  Center,
  Divider,
  Flex,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const Welcome: React.FC = () => {
  const { t } = useTranslation();
  const handleClick = () => {
    window.open('http://parlar.ir/');
  };

  const handleIappsClick = () => {
    window.open('https://iapps.ir/');
  };

  const handleBazarClick = () => {
    window.open('https://cafebazaar.ir/');
  };

  return (
    <Flex sx={CONTAINER}>
      <VStack spacing={3} alignSelf="center" alignItems="center">
        <Heading alignSelf={'center'} flex={1}>
          {'درباره الویا'}
        </Heading>
      </VStack>
      <Divider sx={DIVIDER} />
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
        <GridItem colSpan={2}>
          <Text textAlign={'justify'} fontFamily={'IRANSans'}>
            {
              'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف متنوع با هدفمتنوع با هدفمتنوع با هدف بهبود ابزارهای کاربردی می باشد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.'
            }
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
          <Center>
            <Button
              size="lg"
              w={'full'}
              bgColor={'#284070'}
              mt={'4vh'}
              onClick={handleClick}
            >
              {t('auth:login.actions.website')}
            </Button>
          </Center>
        </GridItem>
        <GridItem colSpan={2} flexGrow={1} mt={'10vh'}>
          <Center justifyContent={'space-between'}>
            <Image
              src={'/Iapps-Badge.png'}
              alt="دانلود اپلیکیشن ELEHOME برای iOS"
              height={'auto'}
              maxWidth={222}
              width={'50%'}
              onClick={handleIappsClick}
              cursor={'pointer'}
            />
            <Image
              src={'/bazar-badge.png'}
              alt="دانلود اپلیکیشن ELEHOME برای Android"
              height={'auto'}
              maxWidth={222}
              width={'50%'}
              onClick={handleBazarClick}
              cursor={'pointer'}
            />
          </Center>
        </GridItem>
      </SimpleGrid>
    </Flex>
  );
};

const CONTAINER: CSSObject = {
  flex: 1,
  flexDir: 'column',
  p: 10,
  alignItems: 'flex-start',
};

const DIVIDER: CSSObject = {
  borderRadius: 'full',
  alignSelf: 'center',
  borderColor: '#5782F8',
  borderWidth: 3,
  width: 120,
  mt: '3vh',
  mb: '3vh',
};
