export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const N_arg = searchParams.get("N");
  let N = 20;

  if (Number.isNaN(N)) {
    return Response.json(
      { success: false, message: "N must be a number" },
      { status: 400 }
    );
  } else {
    N = +(N_arg ? Math.round(+N_arg) : 20);
  }

  if (N > 1500)
    return Response.json(
      { success: false, message: "N is too large" },
      { status: 400 }
    );

  let madelungConstant = 0;

  for (let i = -N; i <= N; i++) {
    for (let j = -N; j <= N; j++) {
      for (let k = -N; k <= N; k++) {
        if (i === 0 && j === 0 && k === 0) {
          continue; // Exclude the self-interaction term
        }

        const term =
          Math.pow(-1, i + j + k) / Math.sqrt(i ** 2 + j ** 2 + k ** 2);
        madelungConstant += term;
      }
    }
  }

  madelungConstant = Math.abs(madelungConstant);

  return Response.json({ N: N, madelung_constant: madelungConstant });
}
