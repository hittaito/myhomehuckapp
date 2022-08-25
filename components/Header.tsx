import { Button, Flex, HStack, Link } from '@chakra-ui/react';

const CTA = 'Get Started';
export default function Header() {
  return (
    <header id="header">
      <Flex w="100%" px="6" align="center" justify="space-between">
        <span>My HomeHuck</span>
        <HStack as="nav" spacing="5">
          <Link href="/">
            {' '}
            <Button variant="nav"> Home </Button>
          </Link>
          {['remoTemp', 'localTemp'].map((item, i) => (
            <Link href={`/measurements/${item}/hour`} key={item}>
              <Button variant="nav"> {item} </Button>
            </Link>
          ))}
        </HStack>
      </Flex>
    </header>
  );
}
