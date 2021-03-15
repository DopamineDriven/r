import { FC, useRef, useEffect, useCallback } from 'react';
import css from './modal.module.css';
import Portal from '@reach/portal';
import { Plus } from '../Icons';
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from 'body-scroll-lock';
import FocusTrap from '@/lib/focus-trap';
import Button from '../Button';

interface ModalProps {
	className?: string;
	children?: any;
	open?: boolean;
	onClose: () => void;
	onEnter?: () => void | null;
}
const Modal: FC<ModalProps> = ({
	children,
	open,
	onClose,
	onEnter = null
}) => {
	const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

	const handleKey = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				return onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		if (ref.current) {
			if (open) {
				disableBodyScroll(ref.current);
				window.addEventListener('keydown', handleKey);
			} else {
				enableBodyScroll(ref.current);
			}
		}
		return () => {
			window.removeEventListener('keydown', handleKey);
			clearAllBodyScrollLocks();
		};
	}, [open, handleKey]);

	return (
		<Portal>
			{open ? (
				<div className={css.root}>
					<div className={css.modal} role='dialog' ref={ref}>
						<Button
							onClick={() => onClose()}
							aria-label='Close panel'
							type='submit'
							className='rounded-lg hover:primary-3 transform transition ease-in-out duration-150 focus:outline-none absolute right-0 top-0 m-6'
						>
							<Plus className='h-6 w-6' />
						</Button>
						<FocusTrap focusFirst>{children}</FocusTrap>
					</div>
				</div>
			) : null}
		</Portal>
	);
};

export default Modal;
