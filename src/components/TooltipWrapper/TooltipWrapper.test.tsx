import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { TooltipWrapper, type TooltipPosition } from './TooltipWrapper';

describe('TooltipWrapper', () => {
  const positions: TooltipPosition[] = ['top', 'bottom', 'left', 'right'];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  positions.forEach((position) => {
    describe(`${position} position`, () => {
      it(`renders tooltip with ${position} position`, async () => {
        render(
          <TooltipWrapper content="Test tooltip" position={position}>
            <button>Trigger</button>
          </TooltipWrapper>
        );

        const trigger = screen.getByRole('button', { name: 'Trigger' });
        fireEvent.mouseEnter(trigger.parentElement!);

        await act(async () => {
          vi.advanceTimersByTime(300);
        });

        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveAttribute('data-position', position);
      });

      it(`applies ${position} class to tooltip`, async () => {
        render(
          <TooltipWrapper content="Test tooltip" position={position}>
            <button>Trigger</button>
          </TooltipWrapper>
        );

        const container = screen.getByRole('button').parentElement!;
        fireEvent.mouseEnter(container);

        await act(async () => {
          vi.advanceTimersByTime(300);
        });

        const tooltip = screen.getByRole('tooltip');
        expect(tooltip.className).toMatch(new RegExp(position));
      });
    });
  });

  it('does not show tooltip before delay', async () => {
    render(
      <TooltipWrapper content="Test tooltip">
        <button>Trigger</button>
      </TooltipWrapper>
    );

    const container = screen.getByRole('button').parentElement!;
    fireEvent.mouseEnter(container);

    await act(async () => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip after delay', async () => {
    render(
      <TooltipWrapper content="Test tooltip">
        <button>Trigger</button>
      </TooltipWrapper>
    );

    const container = screen.getByRole('button').parentElement!;
    fireEvent.mouseEnter(container);

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', async () => {
    render(
      <TooltipWrapper content="Test tooltip">
        <button>Trigger</button>
      </TooltipWrapper>
    );

    const container = screen.getByRole('button').parentElement!;
    fireEvent.mouseEnter(container);

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.mouseLeave(container);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('hides tooltip when mouse leaves before delay', async () => {
    render(
      <TooltipWrapper content="Test tooltip">
        <button>Trigger</button>
      </TooltipWrapper>
    );

    const container = screen.getByRole('button').parentElement!;
    fireEvent.mouseEnter(container);

    await act(async () => {
      vi.advanceTimersByTime(150);
    });

    fireEvent.mouseLeave(container);

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on focus', async () => {
    render(
      <TooltipWrapper content="Test tooltip">
        <button>Trigger</button>
      </TooltipWrapper>
    );

    const container = screen.getByRole('button').parentElement!;
    fireEvent.focus(container);

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('hides tooltip on blur', async () => {
    render(
      <TooltipWrapper content="Test tooltip">
        <button>Trigger</button>
      </TooltipWrapper>
    );

    const container = screen.getByRole('button').parentElement!;
    fireEvent.focus(container);

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.blur(container);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('displays tooltip content', async () => {
    render(
      <TooltipWrapper content="Custom tooltip content">
        <button>Trigger</button>
      </TooltipWrapper>
    );

    const container = screen.getByRole('button').parentElement!;
    fireEvent.mouseEnter(container);

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText('Custom tooltip content')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <TooltipWrapper content="Test tooltip">
        <button>Trigger Button</button>
      </TooltipWrapper>
    );

    expect(screen.getByRole('button', { name: 'Trigger Button' })).toBeInTheDocument();
  });

  it('defaults to top position', async () => {
    render(
      <TooltipWrapper content="Test tooltip">
        <button>Trigger</button>
      </TooltipWrapper>
    );

    const container = screen.getByRole('button').parentElement!;
    fireEvent.mouseEnter(container);

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveAttribute('data-position', 'top');
  });

  it('has aria-describedby when visible', async () => {
    render(
      <TooltipWrapper content="Test tooltip">
        <button>Trigger</button>
      </TooltipWrapper>
    );

    const container = screen.getByRole('button').parentElement!;
    fireEvent.mouseEnter(container);

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(container).toHaveAttribute('aria-describedby');
    const describedBy = container.getAttribute('aria-describedby');
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveAttribute('id', describedBy);
  });

  it('does not have aria-describedby when not visible', () => {
    render(
      <TooltipWrapper content="Test tooltip">
        <button>Trigger</button>
      </TooltipWrapper>
    );

    const container = screen.getByRole('button').parentElement!;
    expect(container).not.toHaveAttribute('aria-describedby');
  });
});
