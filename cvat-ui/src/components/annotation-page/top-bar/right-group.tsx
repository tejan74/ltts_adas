// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Col } from 'antd/lib/grid';
import Icon from '@ant-design/icons';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import Text from 'antd/lib/typography/Text';
import Tooltip from 'antd/lib/tooltip';
import Moment from 'react-moment';

import moment from 'moment';
import { useSelector } from 'react-redux';

import { Modal } from 'antd';
import {
    FilterIcon, FullscreenIcon, InfoIcon, BrainIcon,
} from 'icons';
import {
    CombinedState, DimensionType, Workspace, PredictorState,
} from 'reducers/interfaces';
import image from '../../../assets/keyboard-icon.png';

interface Props {
    workspace: Workspace;
    predictor: PredictorState;
    isTrainingActive: boolean;
    showStatistics(): void;
    switchPredictor(predictorEnabled: boolean): void;
    showFilters(): void;
    changeWorkspace(workspace: Workspace): void;

    jobInstance: any;
}

function RightGroup(props: Props): JSX.Element {
    const {
        showStatistics,
        changeWorkspace,
        switchPredictor,
        workspace,
        predictor,
        jobInstance,
        isTrainingActive,
        showFilters,
    } = props;
    const annotationAmount = predictor.annotationAmount || 0;
    const mediaAmount = predictor.mediaAmount || 0;
    const formattedScore = `${(predictor.projectScore * 100).toFixed(0)}%`;
    const predictorTooltip = (
        <div className='cvat-predictor-tooltip'>
            <span>Adaptive auto annotation is</span>
            {predictor.enabled ? (
                <Text type='success' strong>
                    {' active'}
                </Text>
            ) : (
                <Text type='warning' strong>
                    {' inactive'}
                </Text>
            )}
            <br />
            <span>
                Annotations amount:
                {annotationAmount}
            </span>
            <br />
            <span>
                Media amount:
                {mediaAmount}
            </span>
            <br />
            {annotationAmount > 0 ? (
                <span>
                    Model mAP is
                    {' '}
                    {formattedScore}
                    <br />
                </span>
            ) : null}
            {predictor.error ? (
                <Text type='danger'>
                    {predictor.error.toString()}
                    <br />
                </Text>
            ) : null}
            {predictor.message ? (
                <span>
                    Status:
                    {' '}
                    {predictor.message}
                    <br />
                </span>
            ) : null}
            {predictor.timeRemaining > 0 ? (
                <span>
                    Time Remaining:
                    {' '}
                    <Moment date={moment().add(-predictor.timeRemaining, 's')} format='hh:mm:ss' trim durationFromNow />
                    <br />
                </span>
            ) : null}
            {predictor.progress > 0 ? (
                <span>
                    Progress:
                    {predictor.progress.toFixed(1)}
                    {' '}
                    %
                </span>
            ) : null}
        </div>
    );

    let predictorClassName = 'cvat-annotation-header-button cvat-predictor-button';
    if (!!predictor.error || !predictor.projectScore) {
        predictorClassName += ' cvat-predictor-disabled';
    } else if (predictor.enabled) {
        if (predictor.fetching) {
            predictorClassName += ' cvat-predictor-fetching';
        }
        predictorClassName += ' cvat-predictor-inprogress';
    }

    const filters = useSelector((state: CombinedState) => state.annotation.annotations.filters);

    // code added by giti
    function showKeyboardModal(): void {
        Modal.info({
            title: 'Keyboard Shortcuts',
            content: (
                <div style={{ overflowY: 'scroll', height: 400 }}>
                    <p>Here are some shortcuts which will help you use the tool faster.</p>
                    <p>
                        <Text strong>Cursor:</Text>
                        <Text type='secondary'>[Esc]</Text>
                    </p>
                    <p>
                        <Text strong>Save the current changes:</Text>
                        <Text type='secondary'>[Ctrl+S]</Text>
                    </p>
                    <p>
                        <Text strong>Undo created objects:</Text>
                        <Text type='secondary'>[Ctrl+Z]</Text>
                    </p>
                    <p>
                        <Text strong>Redo created objects:</Text>
                        <Text type='secondary'>[Ctrl+Shift+Z , [Ctrl+Y]</Text>
                    </p>
                    <p>
                        <Text strong>Roatate the image anticlockwise:</Text>
                        <Text type='secondary'>[Ctrl+Shift+R]</Text>
                    </p>
                    <p>
                        <Text strong>Roatate the image clockwise:</Text>
                        <Text type='secondary'>[Ctrl+R]</Text>
                    </p>
                    <p>
                        <Text strong>Fit the image:</Text>
                        <Text type='secondary'>[Double Click]</Text>
                    </p>
                    <p>
                        <Text strong>To draw shape/track again (all marking type):</Text>
                        <Text type='secondary'>[Shift+N , N]</Text>
                    </p>
                    <p>
                        <Text strong>Set up Tag again:</Text>
                        <Text type='secondary'>[Shift+N , N]</Text>
                    </p>
                    <p>
                        <Text strong>Play the frames:</Text>
                        <Text type='secondary'>[Space]</Text>
                    </p>
                    <p>
                        <Text strong>Go back one frame:</Text>
                        <Text type='secondary'>[D]</Text>
                    </p>
                    <p>
                        <Text strong>Go back with a step:</Text>
                        <Text type='secondary'>[C]</Text>
                    </p>
                    <p>
                        <Text strong>Go next frame:</Text>
                        <Text type='secondary'>[F]</Text>
                    </p>
                    <p>
                        <Text strong>Go next frame with a step:</Text>
                        <Text type='secondary'>[V]</Text>
                    </p>
                    <p>
                        <Text strong>Switch lock property for all the marking/annotations:</Text>
                        <Text type='secondary'>[T+L]</Text>
                    </p>

                    <p>
                        <Text strong>Switch hidden property for all the marking/annotations:</Text>
                        <Text type='secondary'>[T+H]</Text>
                    </p>
                    <p>
                        <Text strong>Switch lock property for individual annotated object:</Text>
                        <Text type='secondary'>[ L ]</Text>
                    </p>
                    <p>
                        <Text strong>Switch occluded property for individual annotated object:</Text>
                        <Text type='secondary'>[ Q , / ]</Text>
                    </p>
                    <p>
                        <Text strong>Switch hidden property for individual annotated object:</Text>
                        <Text type='secondary'>[ H ]</Text>
                    </p>
                    <p>
                        <Text strong>Propagate annotation:</Text>
                        <Text type='secondary'>[ Ctrl + B ]</Text>
                    </p>
                </div>
            ),
            width: 1000,

            okButtonProps: {
                style: {
                    width: '100px',
                },
            },
        });
    }
    // code ended by giti

    return (
        <Col className='cvat-annotation-header-right-group'>
            {isTrainingActive && (
                <Button
                    type='link'
                    className={predictorClassName}
                    onClick={() => {
                        switchPredictor(!predictor.enabled);
                    }}
                >
                    <Tooltip title={predictorTooltip}>
                        <Icon component={BrainIcon} />
                    </Tooltip>
                    {annotationAmount ? `mAP ${formattedScore}` : 'not trained'}
                </Button>
            )}
            <Button
                className='cvat-annotation-header-button'
                type='link'
                onClick={() => showKeyboardModal()}
            >
                <img style={{ width: '30px', marginBottom: '5px' }} alt='keyboard' src={image} />
                Shortcut
            </Button>
            <Button
                type='link'
                className='cvat-annotation-header-button'
                onClick={(): void => {
                    if (window.document.fullscreenEnabled) {
                        if (window.document.fullscreenElement) {
                            window.document.exitFullscreen();
                        } else {
                            window.document.documentElement.requestFullscreen();
                        }
                    }
                }}
            >
                <Icon component={FullscreenIcon} />
                Fullscreen
            </Button>
            <Button type='link' className='cvat-annotation-header-button' onClick={showStatistics}>
                <Icon component={InfoIcon} />
                Info
            </Button>
            <Button
                type='link'
                className={`cvat-annotation-header-button ${filters.length ? 'filters-armed' : ''}`}
                onClick={showFilters}
            >
                <Icon component={FilterIcon} />
                Filters
            </Button>
            <div>
                <Select
                    dropdownClassName='cvat-workspace-selector-dropdown'
                    className='cvat-workspace-selector'
                    onChange={changeWorkspace}
                    value={workspace}
                >
                    {Object.values(Workspace).map((ws) => {
                        if (jobInstance.task.dimension === DimensionType.DIM_3D) {
                            if (ws === Workspace.STANDARD) {
                                return null;
                            }
                            return (
                                <Select.Option disabled={ws !== Workspace.STANDARD3D} key={ws} value={ws}>
                                    {ws}
                                </Select.Option>
                            );
                        }
                        if (ws !== Workspace.STANDARD3D) {
                            return (
                                <Select.Option key={ws} value={ws}>
                                    {ws}
                                </Select.Option>
                            );
                        }
                        return null;
                    })}
                </Select>
            </div>
        </Col>
    );
}

export default React.memo(RightGroup);
