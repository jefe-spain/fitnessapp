'use client';

import React from 'react';

export default function ThemeTest() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Prueba de Tema Nord</h2>
        <p className="mb-4">Estos son algunos componentes de DaisyUI con el tema Nord:</p>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-bold">Colores del tema:</h3>
            <div className="flex flex-wrap gap-2">
              <div className="bg-primary h-12 w-12 rounded-lg" />
              <div className="bg-secondary h-12 w-12 rounded-lg" />
              <div className="bg-accent h-12 w-12 rounded-lg" />
              <div className="bg-neutral h-12 w-12 rounded-lg" />
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-bold">Colores base:</h3>
            <div className="flex flex-wrap gap-2">
              <div className="bg-base-100 h-12 w-12 rounded-lg border" />
              <div className="bg-base-200 h-12 w-12 rounded-lg" />
              <div className="bg-base-300 h-12 w-12 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="divider">Botones</div>

        <div className="mb-4 flex flex-wrap gap-2">
          <button className="btn">Default</button>
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-accent">Accent</button>
          <button className="btn btn-info">Info</button>
          <button className="btn btn-success">Success</button>
          <button className="btn btn-warning">Warning</button>
          <button className="btn btn-error">Error</button>
        </div>

        <div className="divider">Badges</div>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="badge">Default</span>
          <span className="badge badge-primary">Primary</span>
          <span className="badge badge-secondary">Secondary</span>
          <span className="badge badge-accent">Accent</span>
          <span className="badge badge-info">Info</span>
          <span className="badge badge-success">Success</span>
          <span className="badge badge-warning">Warning</span>
          <span className="badge badge-error">Error</span>
        </div>

        <div className="divider">Alertas</div>

        <div className="flex flex-col gap-2">
          <div className="alert alert-info">
            <span>Información: Este es un mensaje informativo.</span>
          </div>
          <div className="alert alert-success">
            <span>Éxito: La operación se completó correctamente.</span>
          </div>
          <div className="alert alert-warning">
            <span>Advertencia: Hay algo que requiere tu atención.</span>
          </div>
          <div className="alert alert-error">
            <span>Error: Algo salió mal.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
