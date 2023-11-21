"use client";

import { Button } from "@/ui/button";
import { Label } from "@/ui/input/label";
import { NumberInput } from "@/ui/input/number-input";
import React from "react";

export default function Home() {
  const [N, setN] = React.useState<number>(20);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [constant, setConstant] = React.useState<{
    const: number;
    n: number;
  } | null>(null);
  const [error, setError] = React.useState<string | null>();

  function handleInput(input: string) {
    if (!Number.isNaN(input)) {
      setN(+input);
    }
  }

  async function startCalculation() {
    setLoading(true);
    setError(null);

    const constantResponse = await fetch("/api?N=" + N);
    setLoading(false);

    if (!constantResponse.ok) {
      try {
        const json = await constantResponse.json();
        setError(json.message);
      } catch {
        setError("Something went wrong");
      }
      return;
    }

    const json = await constantResponse.json();

    setConstant({ const: json["madelung_constant"], n: json["N"] });

    console.log(json["madelung_constant"]);
  }

  return (
    <div className=''>
      <div className='max-w-md'>
        <Label htmlFor='n'>Input N</Label>
        <NumberInput
          id='n'
          onChange={handleInput}
          value={N}
          disabled={loading}
          loading={loading}
        />
      </div>

      <Button onClick={startCalculation} loading={loading} disabled={loading}>
        Calculate
      </Button>

      {constant && (
        <div>
          Constant for N={constant.n}: {constant.const}
        </div>
      )}

      {error && <div className='text-destructive'>{error}</div>}
    </div>
  );
}
