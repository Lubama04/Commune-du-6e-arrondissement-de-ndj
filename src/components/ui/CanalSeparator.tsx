interface CanalSeparatorProps {
  align?: 'center' | 'left';
  tight?: boolean;
}

/**
 * Élément signature du site : une ligne dorée de 80px évoquant le Canal
 * des Jardiniers qui borde le 6ᵉ arrondissement à l'ouest.
 * Placée entre chaque section majeure de chaque page.
 */
export function CanalSeparator({ align = 'center', tight = false }: CanalSeparatorProps) {
  return (
    <hr
      aria-hidden="true"
      className={[
        'canal-separator',
        tight ? 'canal-separator--tight' : '',
        align === 'left' ? 'canal-separator--left' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
