
interface TextWaveProps {
  text: string;
}

export default function TextWave({ text }: TextWaveProps) {
  return (
    <span className="relative flex overflow-hidden group">
      <span className="flex transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:-translate-y-full">
        {text.split('').map((char, i) => (
          <span key={i} className="inline-block whitespace-pre">
            {char}
          </span>
        ))}
      </span>
      <span className="absolute flex transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] translate-y-full group-hover:translate-y-0">
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block whitespace-pre"
            style={{ transitionDelay: `${i * 20}ms` }}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
