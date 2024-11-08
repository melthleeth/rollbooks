import React, { useState } from 'react';

import { Center, Flex, Input, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useUser } from '@/hooks/useUser';

interface UserProps {
  employeeId: string;
  name: string;
}

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();
  const { createUserMutation, users } = useUser();

  const handleChangeEmployeeId = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmployeeId(e.target.value);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleClickLogin = async () => {
    // const userInfo = { employeeId, password };
    alert(`로그인 정보: ${employeeId}`);
    router.push('/ui/Admin');

    // const response = await axios.post('/api/auth', userInfo);
    // if (response.status === 200) {
    //   //
    // } else {
    //   setErrorMsg('잘못된 사번 혹은 비밀번호입니다. 다시 입력해주세요.');
    // }

    // 로그인 성공시 admin 유무에 따라 유저페이지 or 관리자페이지로 이동. 아래는 url 예시
    // 유저: /page/221244
    // 관리자: /page/221244/admin
    // router.push('/ui/admin');
  };

  // 관리자 계정 생성
  const handleClickCreateAdmin = async () => {
    let adminId = prompt('관리자 사번 입력', '');
    while (!adminId) {
      alert('빈값이 있습니다. 다시 입력하세요.');
      adminId = prompt('관리자 사번 입력', '');
    }

    let adminPassword = prompt('설정할 비밀번호 입력', '');
    while (!adminPassword) {
      alert('빈값이 있습니다. 다시 입력하세요.');
      adminPassword = prompt('설정할 비밀번호 입력', '');
    }

    alert(`설정한 계정 정보: ${adminId}-${adminPassword}`);
    // await createAdmin(adminId, adminPassword);
  };

  // 사용자 계정 생성
  const handleClickCreateUser = () => {
    let userId = prompt('사번 입력', '');
    while (!userId) {
      alert('빈값이 있습니다. 다시 입력하세요.');
      userId = prompt('사번 입력', '');
    }

    let userPassword = prompt('설정할 비밀번호 입력', '');
    while (!userPassword) {
      alert('빈값이 있습니다. 다시 입력하세요.');
      userPassword = prompt('설정할 비밀번호 입력', '');
    }

    let userName = prompt('이름 입력', '');
    while (!userName) {
      alert('빈값이 있습니다. 다시 입력하세요.');
      userName = prompt('이름 입력', '');
    }

    alert(`설정한 계정 정보: [${userId}]${userName}`);
    createUserMutation.mutate({ userId, userPassword, userName });
  };

  return (
    <Flex
      pt="calc(100vh/4)"
      justifyContent="center"
      alignItems="center"
      fontFamily="pretendard"
    >
      {/* 그래픽 */}
      <Flex w="750px" gap="50px" flexWrap="wrap">
        <Center
          borderRadius="full"
          boxSize="300px"
          backgroundColor="#2F2F2F"
        ></Center>
        <Center
          borderRadius="full"
          boxSize="300px"
          backgroundColor="#DCF42C"
        ></Center>
        <Center
          borderRadius="full"
          boxSize="300px"
          backgroundColor="#D9DDE5"
        ></Center>
        <Center
          borderRadius="full"
          boxSize="300px"
          border="5px dashed #2F2F2F"
        ></Center>
      </Flex>
      {/* 로그인 부분 */}
      <Flex flexDirection="column" fontWeight="semibold" letterSpacing="tight">
        <Flex mb="174px" fontSize="64px">
          WEB개발팀 출석{' '}
          <Text ml="12px" px="8px" boxShadow="inset 0 -30px 0 #DCF42C">
            Check!
          </Text>
        </Flex>
        <Flex data-label="input box" alignItems="center" color="#2F2F2F">
          <Text w="130px" fontSize="24px" fontWeight="400">
            사번
          </Text>
          <Input
            w="100%"
            h="84px"
            fontSize="36px"
            placeholder="112233"
            borderBottom="2px solid #2F2F2F"
            id="employeeId"
            name="employeeId"
            type="text"
            onChange={handleChangeEmployeeId}
          ></Input>
        </Flex>
        <Flex
          data-label="input box"
          mt="28px"
          alignItems="center"
          color="#2F2F2F"
        >
          <Text w="130px" fontSize="24px" fontWeight="400">
            비밀번호
          </Text>
          <Input
            w="100%"
            h="84px"
            fontSize="36px"
            type="password"
            minLength={8}
            required
            borderBottom="2px solid #2F2F2F"
            onChange={handleChangePassword}
          ></Input>
        </Flex>
        <Center
          as="button"
          w="100%"
          h="80px"
          mt="44px"
          color="white"
          bgColor="#2F2F2F"
          fontSize="24px"
          borderRadius="40px"
          onClick={handleClickLogin}
        >
          로그인
        </Center>
        <Flex mt="20px" justifyContent="space-around">
          <Center
            as="button"
            color="#AEAEAE"
            fontSize="18px"
            borderBottom="1px solid #AEAEAE"
            onClick={handleClickCreateUser}
          >
            사용자계정 만들기
          </Center>
          {/* <Center
            as="button"
            color="#AEAEAE"
            fontSize="18px"
            borderBottom="1px solid #AEAEAE"
            onClick={handleClickCreateAdmin}
          >
            관리자계정 만들기
          </Center> */}
        </Flex>
        {errorMsg && <Text>{errorMsg}</Text>}
        {users &&
          users.length > 0 &&
          users.map((user: UserProps) => (
            <Text key={user.employeeId}>
              {user.name} ({user.employeeId})
            </Text>
          ))}
      </Flex>
    </Flex>
  );
};

export default Login;
