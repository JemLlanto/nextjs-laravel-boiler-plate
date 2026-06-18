import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="h-dvh w-dvw bg-(--primary) flex justify-center items-center p-4">
      <div className="bg-(--background) w-full max-w-md rounded-2xl shadow-xl p-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
