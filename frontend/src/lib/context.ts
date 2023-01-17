export type Context = {
  userId: number;
};

export function getContext(): Context {
  return {
    userId: Math.floor(Math.random() * 100000)
  };
}
